exports.excludeFieldsUser = (user) => {
  const {
    password,
    role_id,
    email_verif,
    status,
    role,
    created_at,
    updated_at,
    jwt_reset_token,
    jwt_reset_token_valid,
    ...newUser
  } = user;

  return newUser;
};
