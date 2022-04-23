export const ORDER_STATUS = {
    1: {
      label: "Shipping"
    },
    0: {
      label: "Confirmed"
    }
}
export const IMAGE_ENDPOINT ='https://api.ntustreamhub.com/uploads'

export const API_ENDPOINT = 'https://api.ntustreamhub.com'

export const optionsImagePicker = {
    title: 'Select Image',
    customButtons: [
      { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };