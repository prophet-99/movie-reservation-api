type ErrorResponse = {
  status: number;
  message: string;
  code?: string;
};

type ErrorStrategy = (
  customMessageObj?: Record<string, string>
) => ErrorResponse;

const errorStrategies = {
  CastError: (customMessageObj?: Record<string, string>) => ({
    status: 404,
    message:
      customMessageObj?.['CastError'] ||
      'El tipo de dato no es válido para el identificador proporcionado',
    code: 'CastError',
  }),
  ExceededAttemptsError: (customMessageObj?: Record<string, string>) => ({
    status: 429,
    message:
      customMessageObj?.['ExceededAttemptsError'] ||
      'Se han excedido los intentos permitidos',
  }),
} satisfies Record<string, ErrorStrategy>;

const defaultStrategy: ErrorStrategy = (
  customMessageObj?: Record<string, string>
) => ({
  status: 500,
  message: customMessageObj?.['default'] || 'Error interno del servidor',
});

const getErrorByCodeName = (
  codeName: keyof typeof errorStrategies,
  customMessageObj?: Record<string, string>
) => {
  const strategy = errorStrategies[codeName] || defaultStrategy;

  return strategy(customMessageObj);
};

export { getErrorByCodeName };
