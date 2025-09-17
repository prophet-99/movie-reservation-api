const getErrorByCodeName = (codeName: string) => {
  if (codeName === 'CastError') {
    return {
      status: 404,
      message:
        'El tipo de dato no es válido para el identificador proporcionado',
    };
  }

  return { status: 500, message: 'Error interno del servidor' };
};

export { getErrorByCodeName };
