import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, MenuItem, Select, FormGroup, Checkbox ,ListItemText } from '@mui/material';
import * as Yup from 'yup';
import './App.css'
const initialValues = {
  name: '',
  address: '',
  country: '',
  gender: '',
  hobbies: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  gender: Yup.string().required('Gender is required'),
  hobbies: Yup.array().min(1, 'Select at least one hobby'),
});

const countries = [
  { value: 'UK', label: 'England' },
  { value: 'JP', label: 'Japan' },
  { value: 'CA', label: 'Canada' },
  { value: 'IN', label: 'India'},
  { value: 'NEP', label: 'Nepal'},
  {value: 'BAN' , label: 'Bangladesh'}
];

const hobbiesOptions = [
  { value: 'reading', label: 'Reading' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'traveling', label: 'Traveling' },
];

const App = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
    console.log(values)
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, isSubmitting }) => (
          <Form className="form">
            <h1 className="form-title"> Form</h1>

            <div className="form-field">
              <FormLabel className="form-label" htmlFor="name">Name</FormLabel>
              <Field className={`form-input ${errors.name && touched.name && 'form-input-error'}`} type="text" id="name" name="name" />
              <ErrorMessage className="form-error-message" name="name" component="div" />
            </div>

            <div className="form-field">
              <FormLabel className="form-label" htmlFor="address">Address</FormLabel>
              <Field className={`form-input ${errors.address && touched.address && 'form-input-error'}`} as="textarea" id="address" name="address" rows={4} />
              <ErrorMessage className="form-error-message" name="address" component="div" />
            </div>

            <div className="form-field">
              <FormLabel className="form-label" htmlFor="country">Country</FormLabel>
              <Field className={`form-select ${errors.country && touched.country && 'form-input-error'}`} as={Select} id="country" name="country">
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage className="form-error-message" name="country" component="div" />
            </div>

            <div className="form-field">
              <FormLabel className="form-label">Gender</FormLabel>
              <Field className={`form-select ${errors.gender && touched.gender && 'form-input-error'}`} as={RadioGroup} name="gender">
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </Field>
              <ErrorMessage className="form-error-message" name="gender" component="div" />
            </div>

            <div className="form-field">
              <FormLabel className="form-label">Hobbies/Interests</FormLabel>
              <Field className={`form-select ${errors.hobbies && touched.hobbies && 'form-input-error'}`} as={Select} multiple name="hobbies" renderValue={(selected) => selected.join(', ')}>
                {hobbiesOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Checkbox checked={values.hobbies.indexOf(option.value) > -1} />
                    <ListItemText primary={option.label} />
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage className="form-error-message" name="hobbies" component="div" />
            </div>

            <Button className="form-button" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
