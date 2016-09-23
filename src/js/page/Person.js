/**
 * Created by cag on 2016/9/23.
 */
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    say() {
        return `$(this.name) $(this.age)`;
    }
}

export default Person;