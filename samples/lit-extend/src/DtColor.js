import { DtText } from '@disciple.tools/web-components';

export class DtColor extends DtText {

  firstUpdated() {
    this.type = 'color';
  }
}
