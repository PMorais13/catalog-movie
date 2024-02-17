import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  createComponent,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ErrorHandlerComponent } from '../error-handler.component';
import { LoaderService } from '../../loader/services/loader.service';
import { BaseComponent } from '../../base/base.component';
import { Subscription, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends BaseComponent{
    private observerLoading!: Subscription;
  private renderer: Renderer2;
  private static errorHandlerComponentRef:
    | ComponentRef<ErrorHandlerComponent>
    | undefined;

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly rendererFactory: RendererFactory2,
    private readonly environmentInjector: EnvironmentInjector,
    private readonly loaderService: LoaderService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    super();
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public openErrorHandler(): void {
    this.observerLoading = this.loaderService.$isLoading.pipe(takeUntil(this.onDestroy)).subscribe((data) => {
      if (data) return;
      setTimeout(() => this.createErrorHandler(), 200);
    });
  }

  /**
   * cria o modal de erro no dom
   */
  public createErrorHandler(): void {
    this.renderer.setStyle(this.document?.body, 'overflow-y', 'hidden');
    const errorHandlerComponentRef =
      (ErrorHandlerService.errorHandlerComponentRef = createComponent(
        ErrorHandlerComponent,
        {
          environmentInjector: this.environmentInjector,
        }
      ));
    this.renderer.appendChild(
      this.document?.body,
      errorHandlerComponentRef.location.nativeElement
    );
    this.applicationRef.attachView(errorHandlerComponentRef.hostView);
  }

  /**
   * remove o componente do dom
   */
  public destroyErrorHandlerComponent(): void {
    if (!ErrorHandlerService.errorHandlerComponentRef) return;
    this.renderer.removeStyle(this.document?.body, 'overflow');
    ErrorHandlerService.errorHandlerComponentRef.destroy();
    this.applicationRef.detachView(
      ErrorHandlerService.errorHandlerComponentRef.hostView
    );
    ErrorHandlerService.errorHandlerComponentRef = undefined;
    this.observerLoading.unsubscribe();
  }
}
