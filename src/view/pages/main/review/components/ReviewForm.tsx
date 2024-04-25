import { Button, Card, Col, Row, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import moment from 'moment';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { rangeState, selectRange } from '../../../../features/rangeSlice';
import { selectUnikey } from '../../../../features/unikeySlice';
import { selectusername } from '../../../../features/userSlice';
import { useAppSelector } from '../../../../hooks';
import { Resource } from '../../../../resource';
import { getTypeList, getUserList, save } from '../../../../services';
import { Snowflake } from '../../../../utils';
import schemaCreater from './schema/mainForm';

type RangeType = Exclude<rangeState['range'], null>;

type PickType = Pick<RangeType, 'authorUserId' | 'comment' | 'errorDistCode'>;

const MainFormFooter: React.FC = () => {
  const navigate = useNavigate();
  const viewTheProblem = () => {
    navigate('/table');
  };

  return (
    <Row gutter={16} justify="end">
      <Col>
        <Button onClick={viewTheProblem}>查看问题</Button>
      </Col>
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

  const onFinish = async (formData: PickType) => {
    const errorDistName =
      typeList?.find((el) => el.dictCode === formData.errorDistCode)
        ?.dictName || '未知问题类型';
    const reviewer = userMessage?.label || '未知评审人';
    const reviewerUserId = userMessage?.userId || 0;
    const author =
      userList?.find((el) => el.userId === formData.authorUserId)?.name ||
      '未知作者';
    const snowflake = new Snowflake(1, 0);
    const id = snowflake.nextId();
    const createDate = moment().format('YYYY-MM-DD HH:mm:ss');

    const formMessage = {
      createDate,
      id,
      projectName: '前端测试项目',
      errorDistName,
      reviewer,
      reviewerUserId,
      author,
      code: unikey,
      status: 0,
      gitUrl: '',
      branch: '',
      recordStatus: 0,
      ...formData,
    };

    const res = Object.assign(formMessage, range);
    await save(res);
    message.success('提交成功');
    navigate('/table');
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
