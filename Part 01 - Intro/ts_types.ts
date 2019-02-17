/*
Abbreviation
    exp: Example

Things left to be done
    [ ] Type Assertions (how to practically use it)
    [ ] Type Guard      (how to practically use it & understand why it exists)
*/

function expUnionTypes() {
    /* Widen the allowable values by specifying it could 1+ types. */

    // Used for 'type annotation'
    let a_number: number;
    let a_union_wtf: number | string | Error;

    // Used for 'type alias'
    type SeriesOfTypes = string | number | boolean | Error;

    a_union_wtf = 10
    a_union_wtf = "what"
}

function expIntersectionTypes() {
    /*
    Combining several types into a single supertype
        that includes the members from all participating types.
    
    It's useful for working with Mixins.
    */

    interface PUBG {
        canShoot(): void;
    }

    interface Fortnite {
        canSwitchPerspective(): void;
    }

    type BattleRoyalGame = PUBG & Fortnite;

    let shootingGame: BattleRoyalGame = null;

    // shootingGame.canShoot();
    // shootingGame.canSwitchPerspective();
}

function expLiteralTypes() {
    /* 
    Narrow the range of allowable values.

    It has similar behavior of enumerations
    It is  union types made up of specific values

    Consider using `enum` if you're using numbers only.
    */

    type BigHouse = 'Stark' | 'Lannister' | 'Greyjoy';

    let house: BigHouse;

    house = 'Stark';
    house = 'Lannister';
    // house = 'WHAT_THE_HELL';
}

function expArrays() {
    /*
    
    */

    interface StatInfo {
        gender: string;
        age: number;
    }

    const localPeople: StatInfo[] = [];

    localPeople.push({
        gender: 'Female',
        age: 10
    });

    localPeople.push({
        gender: 'Male',
        age: 30
    });

    function compareAge(a: StatInfo, b: StatInfo) {
        /* Order by age DESC */

        if (a.age > b.age) {
            return -1;
        }
        if (a.age < b.age) {
            return 1;
        }

        return 0;
    }

    console.log(localPeople);  // order by ASC 

    const localPeopleAgeRank = localPeople.sort(compareAge);

    // Array 
    // Array[Index] 
    // Array[Index].DictKey
    console.log("All  :", localPeopleAgeRank);
    console.log("Item :", localPeopleAgeRank[0]);
    console.log("Age  :", localPeopleAgeRank[0].age);
}

function expTuples() {
    /*
    Do not confuse the syntax with 'Union Types' 
    e.g. 
        let OneInChinese:  number | string | string;
        let OneInChinese: [number , string , string];
    
    For myself, they're the same if I use it like this
    i.e. 
        let OneOneOne = [1, "一", "壹"];
        let OneOneOne : (string | number)[];
    */

    // Helps type inferring
    let OneInChinese: [number, string, string];

    OneInChinese = [1, "一", "壹"];
    // OneInChinese = ["一", 1, "壹"]; // Invalid

    let OneOneOne = [1, "一", "壹"];  // I prefer this one

    console.log(OneInChinese);
    console.log(OneOneOne);
}

function expDictionaries() {
    /* 'Checking' is everywhere. */

    interface Animal {
        hasLeg: boolean;
        legs: number;
    }

    interface AnimalDict {
        [index: string]: Animal;
    }

    // My understanding 
    //  Animal      "using the right key" & "limits vals' type"
    //  AnimalDict  "restrict keys' type for accessing"
    let dictionary: AnimalDict = {};

    dictionary['human'] = { hasLeg: true, legs: 2 };
    dictionary['elephant'] = { hasLeg: true, legs: 4 };

    delete dictionary['human'];

    console.log(dictionary);
    console.log(dictionary['elephant']);
}

function expDictionariesAdvanced() {
    /*
    The first one is quite easy to understand,
        it'll raise errors if u're trying to alert it.
    
    For the rest of the two, you could 
        check the post on Reddit: https://bit.ly/2EdfwUs

        whatever ?: boolean             \ (completely omit it)
        whatever : boolean | null       must be null (if else) 

    Also, about the `T`, `k` inside sth like `ReadOnly<T>`
        those might be just conventions (hm)
        you could easily replace them with others (huh?)
    */

    interface Options {
        materal: string;
        backlight: boolean;
    }

    type ReadOnly<T> = { readonly [k in keyof T]: T[k] };
    type Optional<T> = { [k in keyof T]?: T[k]; };
    type Nullable<T> = { [k in keyof T]: T[k] | null };

    type ReadonlyOptions = ReadOnly<Options>;
    type OptionalOptions = Optional<Options>;
    type NullableOptions = Nullable<Options>;

    const o_optional: OptionalOptions = {
        // simply not writing it ..
    }

    const o_readonly: NullableOptions = {
        materal: null,
        backlight: null, // you'd extend it with other types though
    }
}

function expTypeAssertions() {
    /*
    Still "assertions", but a weird look in TS (similar to 'casting').

    I havn't figure this out..
    
    The main reason is that I don't know where to put this into work.
    -- Spec? 
    -- Testing?
    */

    interface House {
        bedrooms: number;
        bathrooms: number;
    }

    interface Mansion {
        bedrooms: number;
        bathrooms: number;
        butlers: number;
    }

    // ---------- ---------- ---------- ----------

    function getProperty(): House | Mansion {
        let typicalHouse: House = { bedrooms: 3, bathrooms: 2 };

        return typicalHouse;
    }

    const property = getProperty();  // such a bad name though..
    console.log(property);

    const bedroomCount = property.bedrooms;
    // const butlerCount = property.butlers;  // It doesn't have that

    const butlerCount = (<Mansion>property).butlers;  // assertion, wtf

    // ---------- ---------- ---------- ----------

    const name: string = 'B221 Street';
    //const anotherName: number = <number>name;

    const anotherName: number = <number><any>name;
    console.log(anotherName);
}

function expTypeGuards() {
    /*
    A type guard is a statement that results in the type becoming narrower.
    */

    function typeGuardUsingIfElse(stringOrNumber: string | number) {
        /* There's magic inside the `if .. else` !! */

        // Error
        // const a = stringOrNumber.length();
        // const b = stringOrNumber.toFixed();

        if (typeof stringOrNumber === "string") {
            return stringOrNumber.length;
        } else {
            return stringOrNumber.toFixed();
        }
    }

    typeGuardUsingIfElse(10);   // => 10
    typeGuardUsingIfElse("10"); // => 2

    // ---------- ---------- ---------- ----------

    interface SpeedControllable {
        increaseSpeed(): void;
        decreaseSpeed(): void;
        stop(): void;
    }

    interface InclineControllable {
        lift(): void;
        drop(): void;
    }

    function isSpeedControllable(treadmill: SpeedControllable | any)
        : treadmill is SpeedControllable {
        if (treadmill.increaseSpeed && treadmill.decreaseSpeed && treadmill.stop) {
            return true;
        }

        return false;
    }

    function typeGuardCustomized(treadmill: SpeedControllable | InclineControllable) {
        /* Just like the previous example, but with our self-defined types. */

        // Error
        // const a = treadmill.increaseSpeed();
        // const b = treadmill.lift();

        if (isSpeedControllable(treadmill)) {
            treadmill.increaseSpeed();
        } else {
            treadmill.lift();
        }
    }
}

function expDiscriminatedUnions() {
    /*
    
    */

    // pass
}


// expUnionTypes();
// expIntersectionTypes();
// expLiteralTypes();

// expArrays();
// expTuples();
// expDictionaries();
// expDictionariesAdvanced();

// expTypeAssertions();
// expTypeGuards();
expDiscriminatedUnions();