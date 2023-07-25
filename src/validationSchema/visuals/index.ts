import * as yup from 'yup';

export const visualValidationSchema = yup.object().shape({
  image: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
