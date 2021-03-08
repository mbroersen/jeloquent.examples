import {
  BelongsTo,
  HasOne,
  Model,
  Field,
  HasMany,
  HasManyThrough,
  MorphOne,
  MorphTo
} from "jeloquent";

/**
 * Has composed primary key {avatar_id: '', avatar_type: ''}
 * Can access parent object by calling myParent
 *
 */
class Avatar extends Model {
  constructor() {
    const fields = [
      new Field("img_url"),
      new Field("avatar_id", true), // primary
      new Field("avatar_type", true), // primary
      new MorphTo("my_parent") // Avatar.my_parent
    ];

    super(fields);
  }
}

class User extends Model {
  constructor() {
    const fields = [
      new Field("id", true), // primary
      new Field("name"),
      //new Field('team_id'), // created by belongsTo
      new BelongsTo(Team), // User.team
      new HasMany(Comment), // User.comments
      new MorphOne(Avatar), // User.avatar
      new HasOne(UserAddress) // User.user_adress
    ];
    super(fields);
  }
}

/**
 *
 */
class UserAddress extends Model {
  constructor() {
    const fields = [
      new Field("id", true), // primary
      new Field("city"),
      new Field("street"),
      new Field("house_number"),
      //new Field('user_id'), // created by belongsTo
      new BelongsTo(User) // UserAddress.user
    ];
    super(fields);
  }
}

/**
 * Team has fields id, name
 * PrimaryKey is id
 * HasMany(User) creates
 * new HasManyThrough(Comment, User) Team.comments
 * Team.avatar
 */
class Team extends Model {
  constructor() {
    const fields = [
      new Field("id", true), // primaryKey
      new Field("name"),
      new HasMany(User), // Team.user
      new HasManyThrough(Comment, User), // Team.comments
      new MorphOne(Avatar) // Team.avatar
    ];

    super(fields);
  }
}

class Comment extends Model {
  constructor() {
    const fields = [
      new Field("id", true),
      new Field("title"),
      new Field("text"),
      //new Field('user_id'), // created by belongsTo
      new BelongsTo(User) // Comment.user
    ];

    super(fields);
  }
}

export { Team, User, Comment, Avatar, UserAddress };
