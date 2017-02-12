import { IltisPage } from './app.po';

describe('iltis App', function() {
  let page: IltisPage;

  beforeEach(() => {
    page = new IltisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
