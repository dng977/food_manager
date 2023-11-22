export const blobToBase64 = (blob: Blob, callback: (a: string) => void ) => {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function() {
    let base64String = reader.result.toString();
    base64String = base64String.substr(base64String.indexOf(',') + 1);
    callback(base64String);
  }
}

//NOT tested
export const base64ToBlob = (base64: string): Blob => {
  console.log("CONVERT TO BLOB");;

  const decodedData = window.atob(base64);
  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: 'image/jpeg' });
};