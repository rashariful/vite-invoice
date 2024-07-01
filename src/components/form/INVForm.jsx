import { Form } from "antd";

import { FormProvider, useForm } from "react-hook-form";

const INVForm = ({ onSubmit, children, defaultValues, resolver }) => {
  const formConfig = {};
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  if (resolver) {
    formConfig.resolver = resolver;
  }
  const methods = useForm(formConfig);

  const submit = (data) => {
    onSubmit(data);
    // methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default INVForm;
