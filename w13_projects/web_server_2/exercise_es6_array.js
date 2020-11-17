const USER_ARRAY = [
    { id: 1, name: 'Martin', age: 45 },
    { id: 2, name: 'Pierre', age: 15 },
    { id: 3, name: 'Josee', age: 14 },
    { id: 4, name: 'Melanie', age: 32 },
    { id: 5, name: 'Sonia', age: 24 }
]

// Result 1
const newuserlist = USER_ARRAY.map(function (value) {
    return {
        id: value.id,
        name: value.name
    }
})

console.log(newuserlist)

// Result 2

const agegreater = USER_ARRAY.filter(function (user) {
    return user.age >= 15
})

console.log(agegreater)

// Result 3
function sumAge (total, userOne) {
    return total + userOne.age
}
// Example compute the average age
const totalAge = USER_ARRAY.reduce(sumAge, 0) // get the sum of all ages

const averageAge = totalAge / USER_ARRAY.length // divide by number of users
console.log(averageAge)
