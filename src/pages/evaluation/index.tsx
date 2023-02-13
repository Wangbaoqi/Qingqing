import { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro, { useDidHide, useDidShow, useReady, useRouter } from "@tarojs/taro";
import { Button, Image, Tag, Uploader, Rate, Skeleton } from "@antmjs/vantui";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import {
  selectTaskDetail,
  selectTaskStatus,
  selectEvaluation,
  selectStudentMissionId,
  getTaskEvaluationAsync,
  selectCurrentTask
} from "@/reducers/taskSlice";
import { getPeriodZh, getClassZh, getSceneZh } from "@/utils/enum";
import { uploadMissMedia } from "@/service/file";
import { submitEvaluation } from "@/service/index";
import { IShowList, ITaskEvaluations } from "@/interface/task";

import "./index.scss";

export default function Evaluation() {
  const { params = {} } = useRouter();
  const dispatch = useAppDispatch();
  const taskDetail = useAppSelector(selectTaskDetail);
  const studentMissionId = useAppSelector(selectStudentMissionId);
  const taskEvaluate = useAppSelector(selectEvaluation);
  const currentTask = useAppSelector(selectCurrentTask)
  const taskLoading = useAppSelector(selectTaskStatus) === "loading";
  const { type = ''} = params;

  const isDone = type === 'COMPLETED';

  useEffect(() => {
    dispatch(getTaskEvaluationAsync(studentMissionId));
  }, [dispatch, studentMissionId]);

  const [showList, setShowList] = useState<IShowList[]>([]);
  const [evaluateList, setEvaluateList] = useState<ITaskEvaluations[]>([]);
  const [scoreEnum, setScoreEnum] = useState({})
  const starTexts = taskEvaluate.evaluateLevel ?? {};

  useEffect(() => {
    const level = taskEvaluate.evaluateLevel;

    for (const key in level) {
      if (Object.prototype.hasOwnProperty.call(level, key)) {
        switch (key) {
          case 'unqualified':
            scoreEnum[`1`] = key;
            break;
          case 'qualified':
            scoreEnum[`2`] = key;
            break;
          case 'commonly':
            scoreEnum[`3`] = key;
            break;
          case 'good':
            scoreEnum[`4`] = key;
            break;
          case 'excellent':
            scoreEnum[`5`] = key;
            break;
        }
      }
    }

    const findStar = (target) => {
      const values: number[] = Object.values(scoreEnum);
      const index = values.findIndex(val => target === val);
      return index && index !== -1  ? index + 1 : -1;
    }

    const newShowList = (taskDetail.showList ?? []).map((task) => {

      let url = '';
      if (Array.isArray(taskEvaluate.missionShows)) {
        url = taskEvaluate.missionShows.find(m => m.id === task.id).description || ''
      }
      return {
        ...task,
        fileList: url ? [{url}] : []
      }
    })
    const newEvaluations = (taskEvaluate.evaluations ?? []).map((evl) => {
      console.log(findStar(evl.result), 'findStar');

      return {
        ...evl,
        score: evl.result || 'good',
        star: evl.result ? findStar(evl.result) : 4
      }
    })
    setScoreEnum(scoreEnum)
    setShowList(newShowList);
    setEvaluateList(newEvaluations);
  }, [taskDetail.showList, taskEvaluate, scoreEnum]);


  const afterRead = (event, task, idx: number) => {
    const { file } = event.detail;
    console.log('afterRead', event.detail, task);
    const current = {
      ...file,
      status: 'uploading',
      message: '上传中...'
    }
    setShowList(prevList => {
      prevList[idx].fileList = prevList[idx].fileList?.concat(current)
      return [...prevList]
    })
    uploadMissMedia(file.url)
      .then(res => {
        console.log(res.data, "upload data");
        if (res.data) {
          const currentSuccess = {
            ...file,
            ...res.data,
            status: 'done',
            message: '上传成功'
          }
          setShowList(prevList => {
            prevList[idx].fileList = []
            prevList[idx].fileList = prevList[idx].fileList?.concat(currentSuccess)
            return [...prevList]
          })
        } else {
          const currentFail = {
            ...file,
            status: 'failed',
            message: '上传失败'
          }
          setShowList(prevList => {
            prevList[idx].fileList = []
            prevList[idx].fileList = prevList[idx].fileList?.concat(currentFail)
            return [...prevList]
          })
        }
      })
      .catch(err => {
        console.log(err, 'upload error');
      })
  };

  const deleteAction = (event, task, idx: number) => {
    const { index } = event.detail;
    setShowList(prevList => {
      prevList = JSON.parse(JSON.stringify(prevList))
      prevList[idx].fileList?.splice(index, 1)
      return [...prevList]
    })
  };

  const afterError = (err) => {
    console.log(err, 'afterError');

  }

  useReady(() => {});

  useDidShow(() => {});

  useDidHide(() => {});

  const onSetStar = (val, idx) => {
    setEvaluateList(prevList => {
      prevList[idx].star = val;
      prevList[idx].score = scoreEnum[val]
      return [...prevList]
    })
  };

  const submitEvaluate = () => {
    Taro.showLoading({
      title: '请稍后...'
    })
    const recordShow = {};
    const evaluateRes = {};
    showList.map((show) => {
      recordShow[`${show.id}`] = (show.fileList??[])[0].previewUri
    })
    evaluateList.map((evl) => {
      evaluateRes[`${evl.dimension}`] = evl.score
    })
    const param = {
      studentMissionId,
      recordShow,
      evaluateRes
    };
    submitEvaluation(param)
      .then(success => {
        console.log(success, "dddd");
        Taro.hideLoading();
        if (success) {
          Taro.showToast({
            icon: 'success',
            title: '评价成功'
          })
        } else {
          Taro.showToast({
            icon: 'error',
            title: '评价失败'
          })
        }
      })
      .catch(err => {
        console.log(err, 'submitEvaluation error');
      })
  };

  return (
    <View className='evaluation'>
      <View className='evaluation__card mb-5'>
        <Image
          src={taskDetail.backgroundImageFileUrl}
          fit='cover'
          width='100%'
          height='180px'
        />
        <View className='evaluation__info p-4'>
          <View className='text-xl font-medium'>{taskDetail.name}</View>
          <View className='text-base mb-4 mt-4'>{taskDetail.description}</View>
          <View className='flex flex-wrap gap-4'>
            <Tag plain type='success'>
              {taskDetail.duration}分钟
            </Tag>
            <Tag plain type='primary'>
              {getPeriodZh(taskDetail.period)}
            </Tag>
            <Tag plain type='primary'>
              {getSceneZh(taskDetail.scene)}
            </Tag>
            <Tag plain type='warning'>
              {getClassZh(taskDetail.classification)}
            </Tag>
          </View>
        </View>
      </View>
      <Skeleton title row={5} loading={taskLoading}>
        {(showList ?? []).map((task, idx) => (
          <View className='evaluation__card mb-5' key={`task#${idx}`} style={{
            display: task.exhibition ? 'block' : 'none'
          }}
          >
            <View className='p-5 text-xl font-medium'>{task.content}</View>
            <View className='p-5 text-base pt-0'>
              <View>{task.description}</View>
              <View className='mt-5'>
                <Uploader
                  fileList={task.fileList}
                  onAfterRead={(e) => afterRead(e, task, idx)}
                  onDelete={(e) => deleteAction(e, task, idx)}
                  onError={afterError}
                  maxCount={1}
                  compressed
                  max-size={2048}
                  deletable={!isDone}
                />
              </View>
            </View>
          </View>
        ))}
      </Skeleton>

      <View className='evaluation__card mb-5'>
        <Skeleton title row={5} loading={taskLoading}>
          <View className='p-5 text-xl font-medium'>主观评价</View>
          <View className='p-5 pt-0'>
            {(evaluateList ?? []).map((ev, idx) => (
              <View className='mb-10' key={`eval#${idx}`}>
                <View className='flex item-center justify-between gap-5 mb-5 pl-5 pr-5'>
                  <View className='flex item-center'>
                    <Text className='text-xl font-medium mt-2 mr-10'>
                      {ev.dimension}
                    </Text>
                    <Rate
                      value={ev.star}
                      color='#ffd21e'
                      disabled={!!ev.result}
                      disabledColor='#ffd21e'
                      onChange={e => onSetStar(e.detail, idx)}
                    />
                  </View>
                  <Text className='text-sm mt-2'>
                    {starTexts[ev.score]}
                  </Text>
                </View>
                <Text className='text-base pl-5 pr-5'>{ev.description}</Text>
              </View>
            ))}
          </View>
        </Skeleton>
      </View>
      {
        taskLoading ? '' : (
          currentTask.missionEvaluateStatus === 'COMPLETED' ? '' : (
            <Button block color='#0DB336' className='mb-10' onClick={submitEvaluate}>
              提交
            </Button>
          )
        )
      }
    </View>
  );
}
