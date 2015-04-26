var config = {};

// secret key (update in production!!!)
config.secretKey = process.env.secretKey || "\x1d\x0fB\x8d'\xaa\xaf\x04\xca\xfe\n\xb8Vg\x95X\x9b\xd6\x18\xd60T`\xc6";

// mongo uri
config.mongoURI = {
  development: "mongodb://localhost:27017/stripe-credit-charge",
  test: "mongodb://localhost/node-stripe-charge-test",
  stage: process.env.MONGOLAB_URI
};

// stripe keys
// Add as env variables
var stripePublishableKey="pk_test_R3eBVbkdHfttbv7Rf8lP4ewH";
var githubClientSecret="sk_test_EANILRQnZxkvZKk8E1XDqwqh";
config.StripeKeys = {
  publishableKey: stripePublishableKey,
  secretKey: process.env.stripeSecretKey
};

// mailgun keys
// Add as env variables
// export "mailgunUsername=GET_YOUR_OWN"
// export "mailgunPassword=GET_YOUR_OWN"
//config.mailgun = {
//  username: process.env.mailgunUsername,
//  password: process.env.mailgunPassword
//};



module.exports = config;