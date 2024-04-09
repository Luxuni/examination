import { Button, Card, Col, Row } from 'antd';
import FormRender, { useForm } from 'form-render';
import { Resource } from '../../../../resource';
import { getUserList } from '../../../../services';
import schemaCreater from './schema/mainForm';

const MainFormFooter = () => {
  return (
    <Row gutter={16} justify="end">
      <Col>
        <Button htmlType="reset">重置</Button>
      </Col>
      <Col>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Col>
    </Row>
  );
};
const resource = new Resource(getUserList());
const ReviewForm: React.FC = () => {
  const userList = resource.read();
  const form = useForm();

  const onFinish = (formData: any) => {
    console.log('formData:', formData);
  };
  return (
    <Card bordered={false}>
      <FormRender
        form={form}
        schema={schemaCreater(userList ?? [])}
        onFinish={onFinish}
        footer={MainFormFooter}
      />
    </Card>
  );
};

export default ReviewForm;
