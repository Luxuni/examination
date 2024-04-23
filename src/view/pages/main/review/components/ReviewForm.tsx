import { Button, Card, Col, Row, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeList } from '../../../../features/listSlice';
import { rangeState, selectRange } from '../../../../features/rangeSlice';
import { selectUnikey } from '../../../../features/unikeySlice';
import { selectusername } from '../../../../features/userSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Resource } from '../../../../resource';
import { getTypeList, getUserList } from '../../../../services';
import schemaCreater from './schema/mainForm';

type RangeType = Exclude<rangeState['range'], null>;

type PickType = Pick<RangeType, 'authorUserId' | 'comment' | 'errorDistCode'>;

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
  const userMessage = useAppSelector(selectusername);
  const unikey = useAppSelector(selectUnikey);

  const userList = useMemo(
    () => userListResource.read()?.filter((el) => el.name.includes('前端')),
    [],
  );

  const typeList = useMemo(() => typeListResource.read(), []);

  const form = useForm();

  const onFinish = (formData: PickType) => {
    const errorDistName =
      typeList?.find((el) => el.dictCode === formData.errorDistCode)
        ?.dictName || '未知问题类型';
    const reviewer = userMessage?.label || '未知评审人';
    const reviewerUserId = userMessage?.userId || 0;
    const author =
      userList?.find((el) => el.userId === formData.authorUserId)?.name ||
      '未知作者';

    const formMessage = {
      createDate: new Date().toLocaleDateString(),
      id: Math.random() * 1000,
      projectName: '前端测试项目',
      errorDistName,
      reviewer,
      reviewerUserId,
      author,
      code: unikey,
      status: 0,
      gitUrl: '',
      branch: '',
      ...formData,
    };
    
    const res = Object.assign(formMessage, range);
    dispatch(changeList(res));
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
