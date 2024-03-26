import { Card, Form, Input, Select } from 'antd';
import { Resource } from '../../../../resource';
import { getUserList } from '../../../../services';

const { TextArea } = Input;

const resource = new Resource(getUserList());
const ReviewForm: React.FC = () => {
  const userList = resource.read();
  return (
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
  );
};

export default ReviewForm;
