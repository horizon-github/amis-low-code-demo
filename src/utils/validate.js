export function validatePassword(rule, value, callback) {
  if (value.length < 5) {
    callback(new Error("密码不能少于5位"));
  } else {
    callback();
  }
}

export function validateUsername(rule, value, callback) {
  if (value.length < 5) {
    callback(new Error("账号不能少于5位"));
  } else {
    callback();
  }
};
