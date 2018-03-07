export class Constants {
  public static RESULT_SUCCESS = 200;

  public static SERVER_HOST = "http://localhost:8000/";

  public static CLIENT_HOST = "http://107.113.193.92:4200/";

  public static URL_GET_TOPIC = Constants.SERVER_HOST + "topic/list";

  public static URL_GET_WORD_BY_TOPIC = Constants.SERVER_HOST + "word";

  public static URL_GET_ALL_WORD = Constants.SERVER_HOST + "word/list/all";

  public static URL_GET_WORD_BY_IDS_TOPIC = Constants.SERVER_HOST + "word/list/idtopic";

  public static URL_CREATE_USER = Constants.SERVER_HOST + "user";

  public static URL_LOGIN_USER = Constants.SERVER_HOST + "user/login";

  public static URL_USER_COUNT_POST_UNREAD = Constants.SERVER_HOST + "user/count/post/unread";

  // cookie
  public static COOKIE_TOKEN_NAME = "token";

  public static COOKIE_EMAIL = "email";

  public static COOKIE_FULLNAME = "fullname";

  public static COOKIE_ID = "_id";

  public static COOKIE_AVATAR_URL = "avatar_url";

  // file
  public static URL_DONWLOAD_FILE = Constants.SERVER_HOST + "file/download?filePath=public\\";
  public static URL_UPLOAD_FILE = Constants.SERVER_HOST + "file/upload";

  // post
  public static URL_GET_ALL_POST = Constants.SERVER_HOST + "post/list";
  public static URL_GET_ALL_POST_V2 = Constants.SERVER_HOST + "post/listv2";
  public static URL_GET_ALL_POST_UNREAD = Constants.SERVER_HOST + "post/unread/list";
  public static URL_GET_ONE_POST = Constants.SERVER_HOST + "post/detail";
  public static URL_CREATE_POST = Constants.SERVER_HOST + "post";



  // comment URL
  public static URL_GET_COMMENT_BY_POST = Constants.SERVER_HOST + "comment/post/";
  public static URL_REPLY_COMMENT = Constants.SERVER_HOST + "comment/reply/";
  public static URL_POST_COMMENT = Constants.SERVER_HOST + "comment";
  public static URL_LIKE_COMMENT = Constants.SERVER_HOST + "comment/user/like/";
  public static URL_DISKLIKE_COMMENT = Constants.SERVER_HOST + "comment/user/disklike/";

  // empty and null
  public static ERROR_EMPTY_CONTENT_COMMENT = "Comment must be not empty!";

  public static AVATAR_DEFAULT = "images/default_img.png";

  public static DESCRIPTION_DEFAULT_OF_POST = "nothing .................";

  // error
  public static ERROR_NOT_LOGIN = "You need to login";

  // query request
  public static PAGE_NUM_DEFAULT = 0;

  public static PAGE_SIZE_DEFAULT = 10;

}
