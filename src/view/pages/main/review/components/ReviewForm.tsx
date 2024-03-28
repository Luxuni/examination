import { Card } from 'antd';
import FormRender, { useForm } from 'form-render';
import { Resource } from '../../../../resource';
import { getUserList } from '../../../../services';
import schemaCreater from './schema/mainForm';

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
        footer={true}
      />
    </Card>
  );
};

export default ReviewForm;
