import React from 'react';

import {
  IsnackbarTemplateReturnType as templateType,
  IsnackbarTemplateParams as templateParams,
} from '@types';

import Typography from '@material-ui/core/Typography';

/**
 * Wszystkie template'y
 */
const snackbarTemplates: object = {

  default: (
    data: templateParams['data'],
    options: templateParams['options'] = {},
  ): templateType => ({
    options,
    content: (
      <div className="snack">
        <Typography
          component="h6"
          variant="subtitle1"
          color="inherit"
        >
          {data.title}
        </Typography>

        <Typography
          variant="caption"
          color="inherit"
        >
          {data.subtitle}
        </Typography>
      </div>
    ),
  }),

};

export { snackbarTemplates };
