import { Button, Card, Col, Row, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useNavigate } from 'react-router-dom';
import { changeList } from '../../../../features/listSlice';
import { selectRange } from '../../../../features/rangeSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const range = useAppSelector(selectRange);

  const userList = resource.read()?.filter((el) => {
    return el.name.includes('前端');
  });
  const form = useForm();

  const onFinish = (formData: any) => {
    console.log(range, 'range');
    formData.range = range;
    formData.date = new Date().toLocaleDateString();
    (formData.id = Date.now()), console.log('formData:', { formData });
    dispatch(changeList(formData));
    message.success('提交成功');
    setTimeout(() => {
      navigate('/about');
    }, 2000);
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
