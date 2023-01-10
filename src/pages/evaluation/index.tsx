import { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import { useDidHide, useDidShow, useReady } from "@tarojs/taro";
import { Button, Image, Tag, Uploader, Rate, Skeleton } from "@antmjs/vantui";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import {
  selectTaskDetail,
  selectTaskStatus,
  selectEvaluation,
  selectStudentMissionId,
  getTaskEvaluationAsync
} from "@/reducers/taskSlice";
import { getPeriodZh, getClassZh, getSceneZh } from "@/utils/enum";
import { uploadMissMedia } from "@/service/file";
import { submitEvaluation } from "@/service/index";

import "./index.scss";

export default function Evaluation() {
  const dispatch = useAppDispatch();
  const taskDetail = useAppSelector(selectTaskDetail);
  const studentMissionId = useAppSelector(selectStudentMissionId);
  const taskEvaluate = useAppSelector(selectEvaluation);
  const taskLoading = useAppSelector(selectTaskStatus) === "loading";

  useEffect(() => {
    dispatch(getTaskEvaluationAsync(studentMissionId));
  }, [dispatch, studentMissionId]);

  useEffect(() => {

    // const showList = (taskDetail.showList ?? []).map((task = {}) => {
    //   const show =
    //   return {
    //     ...task,
    //   }
    // })

  }, [taskDetail.showList]);

  const [star, setStar] = useState(5);
  const starText = ["不合", "合格", "一般", "良好", "优秀"];

  const showList = [
    {
      "content":"过程记录",
      "description":"1、上传过程记录视频（总长共1分钟，可以是最多3段视频）2、上传过程照片（1-3张）",
      "id": "1611190105675038722",
      fileList: [],
      deletable: true
    },
    {
      "content":"成果展示",
      "description":"上传成果照片一张",
      "id": "1611190105675038723",
      fileList: [],
      deletable: true
    }
  ]

  const [processList, setProcessList] = useState([]);

  const afterRead = event => {
    const { file, name } = event.detail;

    uploadMissMedia(file.url).then(res => {
      console.log(res.data, "upload data");
    });
    // 可在此处新增云上传图片操作
    setProcessList(processList.concat(file));
  };

  const deleteAction = event => {
    const { index } = event.detail;
    const valueNew = JSON.parse(JSON.stringify(processList));
    valueNew.splice(index, 1);
    setProcessList(valueNew);
  };

  useEffect(() => {}, []);

  useReady(() => {});

  useDidShow(() => {});

  useDidHide(() => {});

  const pp = {
    studentMissionId: "1611419475922677762",
    recordShow: {
      "1611190105675038722":
        "http://47.98.186.0:9000/ai-edu-file/image/20230110/YQRqMKCTAN6b0d783e2795b4aef0cd60bed69ea54d0b_20230110181835a3f5f/YQRqMKCTAN6b0d783e2795b4aef0cd60bed69ea54d0b_20230110181835a3f5f.png"
    },
    evaluateRes: { 观点: "excellent" }
  };

  const submitEvaluate = () => {
    const param = {
      studentMissionId: "1611419475922677762",
      recordShow: {
        [`1611190105675038722`]: "http://47.98.186.0:9000/ai-edu-file/image/20230110/YQRqMKCTAN6b0d783e2795b4aef0cd60bed69ea54d0b_20230110181835a3f5f/YQRqMKCTAN6b0d783e2795b4aef0cd60bed69ea54d0b_20230110181835a3f5f.png"
      },
      evaluateRes: {
        观点: "excellent"
      }
    };
    submitEvaluation(param).then(res => {
      console.log(res, "dddd");
    });
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
        {(taskDetail.showList ?? []).map((task, idx) => (
          <View className='evaluation__card mb-5' key={`task#${idx}`}>
            <View className='p-5 text-xl font-medium'>{task.content}</View>
            <View className='p-5 text-base pt-0'>
              <View>{task.description}</View>
              <View className='mt-5'>
                <Uploader
                  fileList={processList}
                  onAfterRead={afterRead}
                  onDelete={deleteAction}
                  deletable
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
            {(taskDetail.evaluateList ?? {}).map((ev, idx) => (
              <View className='mb-5' key={`eval#${idx}`}>
                <View className='flex item-center gap-5 mb-5'>
                  <Text className='text-xl font-medium mt-2 mr-10'>
                    {ev.dimension}
                  </Text>
                  <Rate
                    value={star}
                    color='#ffd21e'
                    onChange={e => setStar(e.detail)}
                  />
                  <Text className='text-base font-medium mt-2'>
                    {starText[star - 1]}
                  </Text>
                </View>
                <Text className='text-base'>{ev.description}</Text>
              </View>
            ))}
          </View>
        </Skeleton>
      </View>
      <Button block color='#0DB336' className='mb-10' onClick={submitEvaluate}>
        提交
      </Button>
    </View>
  );
}
