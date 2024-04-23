import { Button, Card, Col, Row, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeList } from '../../../../features/listSlice';
import { rangeState, selectRange } from '../../../../features/rangeSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Resource } from '../../../../resource';
import { getTypeList, getUserList } from '../../../../services';
import schemaCreater from './schema/mainForm';

type RangeType = Exclude<rangeState['range'], null>;

type PickType = Pick<RangeType, 'author' | 'date' | 'id' | 'opinion' | 'type'>;

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

const userListResource = new Resource(getUserList());
const typeListResource = new Resource(getTypeList());
const ReviewForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const range = useAppSelector(selectRange);

  const userList = useMemo(
    () => userListResource.read()?.filter((el) => el.name.includes('前端')),
    [],
  );

  const typeList = useMemo(() => typeListResource.read(), []);

  const form = useForm();

  const onFinish = (formData: PickType) => {
    const formMessage = Object.assign(formData || {}, range);
    formData.date = new Date().toLocaleDateString();
    formData.id = Date.now();
    dispatch(changeList(formMessage));
    message.success('提交成功');
    setTimeout(() => {
      navigate('/about');
    }, 2000);
  };

  return (
    <Card bordered={false}>
      <FormRender
        form={form}
        schema={schemaCreater(userList ?? [], typeList ?? [])}
        onFinish={onFinish}
        footer={MainFormFooter}
      />
    </Card>
  );
};

export default ReviewForm;
