import { useAsyncEffect } from 'ahooks';
import { Card, Form, Input, Select } from 'antd';
import React from 'react';
import CodeHeighlighter from '../../components/CodeHighlighter';
import { selectUnikey } from '../../features/unikeySlice';
import { useAppSelector } from '../../hooks';
import { getCodeList, getUserList } from '../../services';
const { TextArea } = Input;
const App: React.FC = () => {
  const unikey = useAppSelector(selectUnikey);
  const [userList, setUserList] = React.useState<
    {
      name: string;
      userId: number;
    }[]
  >([]);
  const [codeList, setCodeList] = React.useState<
    {
      code: string;
      codeId: number;
    }[]
  >([]);
  useAsyncEffect(async () => {
    const data = await getUserList();
    setUserList(data);
    // const codeData = await getCodeList();
    // console.log(codeData);

    // setCodeList(codeData);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <CodeHeighlighter hoverable bordered={false} code={unikey} />
      <Card bordered={false}>
        <Form labelCol={{ span: 3 }} labelAlign="left" layout="horizontal">
          <Form.Item label="评审意见">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="问题类型">
            <Input />
          </Form.Item>
          <Form.Item label="作者">
            <Select>
              {userList.map((v, i) => (
                <Select.Option value={v.userId} key={v.userId}>
                  {v.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default App;
