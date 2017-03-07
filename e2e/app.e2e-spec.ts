import { EffectsTestPage } from './app.po';

describe('effects-test App', () => {
  let page: EffectsTestPage;

  beforeEach(() => {
    page = new EffectsTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
