function skillsMember() {
  var member = {
    name: 'John',
    age: 25,
    skills: ['JavaScript', 'React', 'Node'],
    greet: function () {
      console.log(`Hello, I'm ${this.name}`);
    }
  };

  return member;
}