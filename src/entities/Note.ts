export default interface Note {
  _id?: string | number;
  id?: string | number; //pa no cambiar código cuando pase la api de mongo a sql. Si, muy sucio
  title: string;
  content: string;
}
