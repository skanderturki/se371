class PhoneFormatException extends Error {
  constructor(phone) {
    super(`${phone} is not a valid phone number`);
  }
  message = "Phone number is not a valid phone number"
};

class PhoneNumber {
  pattern = /[0-9]{10}?/;

  constructor(phone) {
    phone = String(phone);
    const match = phone.match(this.pattern);
    if (!match) {
      throw new PhoneFormatException(phone);
    }
    this.value = match[0];
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value;
  }
};

let phoneA;
try {
  phoneA = new PhoneNumber("4512458a235");
  console.log(`The phone number is ${phoneA}`);
} catch (e) {
  console.error(e.message);
}
