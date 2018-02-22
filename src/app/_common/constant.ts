export class Constants {
  public static RESULT_SUCCESS = 200;

  public static SERVER_HOST = "http://localhost:8000/";

  public static URL_GET_TOPIC = Constants.SERVER_HOST + "topic/list";

  public static URL_GET_WORD_BY_TOPIC = Constants.SERVER_HOST + "word";

  public static URL_GET_ALL_WORD = Constants.SERVER_HOST + "word/list/all";

  public static URL_GET_WORD_BY_IDS_TOPIC = Constants.SERVER_HOST + "word/list/idtopic";

  public static URL_CREATE_USER = Constants.SERVER_HOST + "user";

  public static URL_LOGIN_USER = Constants.SERVER_HOST + "user/login";

  public static COOKIE_TOKEN_NAME = "token";

   // file
   public static URL_DONWLOAD_FILE = Constants.SERVER_HOST + 'file/download?filePath=public\\';
   public static URL_UPLOAD_FILE = Constants.SERVER_HOST + 'file/upload';
}
