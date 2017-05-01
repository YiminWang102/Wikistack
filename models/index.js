const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  loggin: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.TEXT) 
    }
}, {
  hooks: {
    beforeValidate: function(page, options) {
      var generateUrlTitle = function(title) {
        if (title) {
          return title.replace(/\s+/g, '_').replace(/\W/g, '');
        } else {
          return Math.random().toString(36).substring(2, 7);
        }
      }
      page.urlTitle = generateUrlTitle(page.title);
    }
  },

  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  }

});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
    }
},{
  getterMethods : {
    route: function(){
      return '/users/' + this.id;
    }
  }
});

Page.belongsTo(User, { as: 'author' })

module.exports = {
  db: db,
  Page: Page,
  User: User
};

// Page.sync();
//
// User.Sync();
