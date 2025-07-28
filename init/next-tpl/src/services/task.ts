import { data, post, toastMessage, get } from '@/lib/request';
import { UrlInfo } from '@/services/types/video';

export const getUrlInfo = (url: string) => {
  return get<UrlInfo>('/info', {
    url: url,
  }).then(data, toastMessage);
};

export type State = 'pending' | 'downloading' | 'completed' | 'failed';

export const queryTask = (task_id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    get<{ state: State; download_url: string }>('/download/status', { task_id })
      .then<{ state: State; download_url: string }>(data, toastMessage)
      .then(({ state, download_url }) => {
        if (state === 'failed') {
          reject({ msg: 'download error' });
        } else if (state === 'completed') {
          console.log(download_url);
          resolve(download_url);
        } else {
          setTimeout(() => {
            queryTask(task_id).then(resolve, reject);
          }, 2000);
        }
      })
      .catch((err) => reject({ msg: 'download error' }));
  });
};

export const downloadMedia = async (format_id: string, url: string) => {
  const { task_id } = await post<{ task_id: string }>('/download', {
    format_id,
    url,
  }).then<{ task_id: string }>(data, toastMessage);
  if (task_id) {
    return queryTask(task_id);
  }
};
