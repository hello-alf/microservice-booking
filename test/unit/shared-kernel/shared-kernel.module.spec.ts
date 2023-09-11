import { SharedKernelModule } from '../../../src/shared-kernel/shared-kernel.module';

describe('SharedKernelModule', () => {
  it('Debe estar definido', () => {
    const module = new SharedKernelModule();
    expect(module).toBeDefined();
  });
});
