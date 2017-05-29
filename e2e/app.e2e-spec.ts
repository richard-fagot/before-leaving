import { BeforeLeavingHomePage } from './app.po';

describe('before-leaving-home App', () => {
  let page: BeforeLeavingHomePage;

  beforeEach(() => {
    page = new BeforeLeavingHomePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
