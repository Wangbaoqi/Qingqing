import Api from '@/config/api';

import request from '@/utils/request/http';

export const getTest = () => {

  return request.get(Api.testApi)
}
