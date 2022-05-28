// ACTION LAYER
// At minimum, we should have an identifier property (i.e. type)

export const registerClass = (classroom) => {
  return {
    type: 'REGISTER_CLASS',
    addedClass: classroom
  }
}