import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
  if (Array.isArray(req)) {
    return req[2].req.user;
  } else {
    return req.user;
  }
});
