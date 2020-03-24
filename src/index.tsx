import plusnew from '@plusnew/core';
import driver from '@plusnew/driver-dom';
import Core from './Core';

plusnew.render(<Core />, {
  driver: driver(document.body)
});
