import { useAsyncEffect } from 'ahooks';
import { Card, Form, Input, Select } from 'antd';
import React from 'react';
import CodeHeighlighter from '../../components/CodeHighlighter';
import { selectUnikey } from '../../features/unikeySlice';
import { useAppSelector } from '../../hooks';
import { createResource } from '../../resource';
import { getUserList } from '../../services';
const { TextArea } = Input;

const resource = createResource(getUserList());

const App: React.FC = () => {
  const unikey = useAppSelector(selectUnikey);
  const userList = resource.read();
  useAsyncEffect(async () => {}, []);
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
              {userList?.map((v, i) => (
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
