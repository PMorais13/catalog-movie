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
import { BehaviorSubject } from 'rxjs';

import { LoaderComponent } from '../loader.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public static loading = 0;
  private static loaderComponentRef: ComponentRef<LoaderComponent> | undefined;
  private renderer: Renderer2;
  public readonly $isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly environmentInjector: EnvironmentInjector,
    private readonly rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * inicia o loader
   */
  public loadStarted(): void {
    LoaderService.loading++;
    this.checkLoading();
  }

  /**
   * loader completo
   */
  public loadCompleted(): void {
    if (LoaderService.loading) {
      LoaderService.loading--;
    }

    this.checkLoading();
  }

  /**
   * checagem do loader
   */
  private checkLoading(): void {
    if (LoaderService.loading) {
      this.$isLoading.next(true);
      setTimeout(() => this.createLoaderComponent(), 150);
    } else {
      setTimeout(() => this.destroyLoaderComponent(), 150);
      this.$isLoading.next(false);
    }
  }

  /**
   * cria o componente de loader no dom
   */
  private createLoaderComponent(): void {
    if (LoaderService.loaderComponentRef || !LoaderService.loading) {
      return;
    }
    this.renderer.setStyle(this.document?.body, 'overflow-y', 'hidden');
    const loaderComponentRef = (LoaderService.loaderComponentRef =
      createComponent(LoaderComponent, {
        environmentInjector: this.environmentInjector,
      }));
    this.renderer.appendChild(
      this.document?.body,
      loaderComponentRef.location.nativeElement
    );
    this.applicationRef.attachView(loaderComponentRef.hostView);
  }

  /**
   * remove o componente do dom
   */
  private destroyLoaderComponent(): void {
    if (!LoaderService.loaderComponentRef || LoaderService.loading) {
      return;
    }
    this.renderer.removeStyle(this.document?.body, 'overflow-y');
    LoaderService.loaderComponentRef.destroy();
    this.applicationRef.detachView(LoaderService.loaderComponentRef.hostView);
    LoaderService.loaderComponentRef = undefined;
  }
}
