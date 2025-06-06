import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, EnvironmentInjector, RendererFactory2 } from '@angular/core';
import * as ngCore from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { LoaderService } from '../../loader/services/loader.service';

class AppRefStub {
  attachView() {}
  detachView() {}
}

class Renderer2Stub {
  setStyle(el: any, style: string, value: any) {
    el.style[style] = value;
  }
  removeStyle(el: any, style: string) {
    el.style[style] = '';
  }
  appendChild(parent: any, child: any) {
    parent.appendChild(child);
  }
}

class RendererFactory2Stub {
  createRenderer() {
    return new Renderer2Stub();
  }
}

class EnvironmentInjectorStub {}
class LoaderServiceStub {}

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let documentRef: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: ApplicationRef, useClass: AppRefStub },
        { provide: RendererFactory2, useClass: RendererFactory2Stub },
        { provide: EnvironmentInjector, useClass: EnvironmentInjectorStub },
        { provide: LoaderService, useClass: LoaderServiceStub },
      ],
    });
    service = TestBed.inject(ErrorHandlerService);
    documentRef = TestBed.inject(DOCUMENT);
    (service as any).observerLoading = { unsubscribe: () => {} };
  });

  it('should remove overflow-y style when destroyed', () => {
    const componentRefStub = {
      location: { nativeElement: documentRef.createElement('div') },
      hostView: {},
      destroy: () => {},
    } as any;
    spyOn(ngCore, 'createComponent').and.returnValue(componentRefStub);

    service.createErrorHandler();
    expect((documentRef.body as HTMLElement).style.overflowY).toBe('hidden');

    service.destroyErrorHandlerComponent();
    expect((documentRef.body as HTMLElement).style.overflowY).toBe('');
  });
});
