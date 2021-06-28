import { useEffect, useRef, useState } from 'react';
import {
  WingBlank,
  WhiteSpace,
  Progress,
  Button,
  Icon,
  Toast,
} from 'antd-mobile';
import { isImage, CHUNK_SIZE } from '@/until/index';
import styles from './index.less';

export default function IndexPage() {
  const ref = useRef(null);
  const [totalProgress, setTotalProgress] = useState(0);
  const [chunks, setChunks] = useState<Array<ChunkProps>>([]);
  const [file, setFile] = useState();
  useEffect(() => {
    const list: Array<ChunkProps> = [];
    for (let i = 0; i < 16; i++) {
      const chunk = {
        progress: Math.random() * 100,
      };
      list.push(chunk);
    }
    setChunks(list);
    ref.current.addEventListener('dragover', (e) => {
      ref.current.style.borderColor = 'red';
      e.preventDefault();
    });
    ref.current.addEventListener('dragleave', (e) => {
      ref.current.style.borderColor = '#eee';
      e.preventDefault();
    });
    ref.current.addEventListener(
      'drop',
      async (e) => {
        const fileList = e.dataTransfer.files;
        ref.current.style.borderColor = '#eee';
        const currentFile = fileList[0]; // 先只考虑单文件
        if (!currentFile) return;
        if (currentFile.size > CHUNK_SIZE) {
          Toast.fail('请选择小于2M的文件');
          return;
        }
        console.log(CHUNK_SIZE);
        if (!(await isImage(currentFile))) {
          Toast.fail('请选择正确的图片格式');
          return;
        }
        setFile(currentFile);
        e.preventDefault();
      },
      false,
    );
    return () => {};
  }, []);
  const cb = () => {};
  const fileChange = async (e) => {
    const [currentFile] = e.target?.files;
    if (!currentFile) return;
    if (currentFile.size > CHUNK_SIZE) {
      Toast.fail('请选择小于2M的文件');
      return;
    }
    console.log(CHUNK_SIZE);
    if (!(await isImage(currentFile))) {
      Toast.fail('请选择正确的图片格式');
      return;
    }
    console.log(ref);
    setFile(currentFile);
  };
  const fileUpload = async () => {};
  return (
    <WingBlank>
      <WhiteSpace />
      <input type="text" />
      <WhiteSpace />
      <div ref={ref} className={styles.drag}>
        <input type="file" onChange={fileChange} />
      </div>
      <WhiteSpace />
      <div>上传进度</div>
      <WhiteSpace />
      <Progress percent={totalProgress} position="normal" />
      <WhiteSpace />
      <div>文件准备中</div>
      <Progress percent={10} position="normal" />
      <WhiteSpace />
      <Button type="primary" onClick={fileUpload}>
        上传
      </Button>
      <WhiteSpace />
      <Button type="primary">慢启动上传</Button>
      <WhiteSpace />
      {/* {chunks.map((item) => (
        <Chunk progress={item.progress} />
      ))} */}
    </WingBlank>
  );
}

interface ChunkProps {
  progress: Number;
}
function Chunk(props: ChunkProps) {
  const { progress } = props;
  return <div>{progress !== 100 && <Icon type="loading" />}</div>;
}
