import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createDigitalMarketing } from 'apiSdk/digital-marketings';
import { digitalMarketingValidationSchema } from 'validationSchema/digital-marketings';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { DigitalMarketingInterface } from 'interfaces/digital-marketing';

function DigitalMarketingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DigitalMarketingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDigitalMarketing(values);
      resetForm();
      router.push('/digital-marketings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DigitalMarketingInterface>({
    initialValues: {
      seo: '',
      sem: '',
      ppc_campaigns: '',
      smm: '',
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: digitalMarketingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Digital Marketings',
              link: '/digital-marketings',
            },
            {
              label: 'Create Digital Marketing',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Digital Marketing
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.seo}
            label={'Seo'}
            props={{
              name: 'seo',
              placeholder: 'Seo',
              value: formik.values?.seo,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.sem}
            label={'Sem'}
            props={{
              name: 'sem',
              placeholder: 'Sem',
              value: formik.values?.sem,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.ppc_campaigns}
            label={'Ppc Campaigns'}
            props={{
              name: 'ppc_campaigns',
              placeholder: 'Ppc Campaigns',
              value: formik.values?.ppc_campaigns,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.smm}
            label={'Smm'}
            props={{
              name: 'smm',
              placeholder: 'Smm',
              value: formik.values?.smm,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/digital-marketings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'digital_marketing',
    operation: AccessOperationEnum.CREATE,
  }),
)(DigitalMarketingCreatePage);
