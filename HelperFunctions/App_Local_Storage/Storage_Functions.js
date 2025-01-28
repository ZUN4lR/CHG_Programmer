import RNFS from 'react-native-fs';
import { requestStoragePermission } from '../../source/Permissions/PermissionsFlie';

export const createAppFolder_in_userPhone = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;
      
        // const folderPath = `${RNFS.ExternalStorageDirectoryPath}/CHG_Programmer`;
        // const folderPath = `${RNFS.DocumentDirectoryPath}/CHG_Programmer`;
        // const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Download/CHG Programmer`;
        const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Documents/CHG Programmer`;

        try {
          const folderExists = await RNFS.exists(folderPath);
          if (!folderExists) {
            await RNFS.mkdir(folderPath);
            console.log('Folder created at:', folderPath);
          } else {
            console.log('Folder already exists at:', folderPath);
          }
        } catch (error) {
          console.error('Error creating folder:', error);
        }
      };
      
      const readFileFromUri = async (uri, destinationPath) => {
        try {
          const fileContent = await RNFS.readFile(uri, 'base64');
          await RNFS.writeFile(destinationPath, fileContent, 'base64');
          console.log('File saved from content URI');
        } catch (error) {
          console.error('Error reading file from URI:', error);
        }
      };

    
     export const saveFileToCHGProgrammerFolder = async (file) => {
        try {
            const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Documents/CHG Programmer`;
            const destinationPath = `${folderPath}/${file.name}`;
      
          // Ensure the folder exists
          const folderExists = await RNFS.exists(folderPath);
          if (!folderExists) {
            await RNFS.mkdir(folderPath);
            console.log('Folder created:', folderPath);
          }
      
          // Read file from URI and write to destination
          const fileContent = await RNFS.readFile(file.uri, 'base64');
      
          await RNFS.writeFile(destinationPath, fileContent, 'base64');
          console.log(`File saved successfully at: ${destinationPath}`);
          alert('File saved successfully!');
        } catch (error) {
          console.error('Error saving file:', error);
          alert('Failed to save file.');
        }
      };
      
      