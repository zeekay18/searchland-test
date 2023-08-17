import {
  ClassTransformOptions,
  ExposeOptions,
  Transform,
  plainToInstance,
} from "class-transformer";

export function mapPlainToInstance<T, V>(
  dest: new () => T,
  src: V[],
  options?: ClassTransformOptions
): T[];

export function mapPlainToInstance<T, V>(
  dest: new () => T,
  src: V,
  options?: ClassTransformOptions
): T;

export function mapPlainToInstance<T, V>(
  dest: new () => T,
  src: V | V[],
  options?: ClassTransformOptions
): T | T[] {
  const transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    ...options,
  };

  if (Array.isArray(src)) {
    return plainToInstance(dest, src, transformOptions) as T[];
  } else {
    return plainToInstance(dest, src, transformOptions) as T;
  }
}

export function TransformMongoId(options?: ExposeOptions) {
  return (target: any, propertyKey: string) => {
    Transform((params) => params.obj[propertyKey]?.toString(), options)(
      target,
      propertyKey
    );
  };
}
