let balance1 = 200;
let balance2 = 300;
let balance3 = 400;
const password1 = 1234;
const password2 = 4321;
const password3 = 5678;
let usersInfo = [
  ['Ambartsum', 'Karapetyan', balance1, password1],
  ['Mamuka', 'Fotskhveria', balance2, password2],
  ['Koba', 'Gelashvili', balance3, password3]
];



const askForEntry = () => confirm('თუ გნებავთ პირად ანგარიშში შესვლა დააჭირეთ  "ОК"\nან გააუქმეთ ღილაკით "CANCLE"');
console.log('თუ გნებავთ პირად ანგარიშზე შესვლა დააჭირეთ "ОК"\nან გააუქმეთ ღილაკით "CANCLE"') ;
// პირად ანგარიშძე შჰემოსვლის ფუნქცია
const login = () => {
  return askForEntry()
    ?  checkUserName()
    : alert('თქვენ გააუქმეთ შემოსვლა') && console.log('თქვენ გააუქმეთ შემოსვლა');
};

// სახელის შემოტანის და შემოწმების ფუნქცია
function checkUserName() {
  console.log('GEO BANK\nგვერდზე შემოსვლისთვის შეიყვანეთ თქვენი სახელი:');
  let userInputName = prompt('GEO BANK\nგვერდზე შემოსვლისთვის შეიყვანეთ თქვენი სახელი:');
  let userIndex = -1;
  if (userInputName === null) {
    login();
    return;
  }
  if (userInputName === "") {
    console.log("თქვენ არ შეიყვანეთ სახელი, გაიმეორეთ.");
    alert("თქვენ არ შეიყვანეთ სახელი, გაიმეორეთ.");
    checkUserName();
    return;
}
  if (!/^[a-zA-Z]+$/.test(userInputName)) {
    console.log('შეყვანილი სახელი უნდა იყოს მხოლოდ ლათინური ასოებით');
    alert('შეყვანილი სახელი უნდა იყოს მხოლოდ ლათინური ასოები');
    checkUserName();
    return;
  } else{   
      for (let i = 0; i < usersInfo.length; i++) {
        if (userInputName === usersInfo[i][0]) {
          userIndex = i;
          console.log(`გამარჯობათ  ${userInputName}`);
          checkPassword(userIndex);
          return;
          }
        else{
          console.log(`მომხმარებელი ${userInputName} სახელით არ არსებობს.\n გაიმეორე`);
          alert(`მომხმარებელი ${userInputName} სახელით არ არსებობს.\nგინდათ გაიმეორეთ`);
          checkUserName();
        }
      }
    }
}

// პინ კოდის შემოტანის და შემოწმების ფუნქცია
function checkPassword(userIndex) {
  let tryInputPassword = 3;
  while (tryInputPassword > 0) {
    console.log(`შეიყვანეთ ოთხნიშნა პინ კოდი.\nდარჩენილი ცდილობების რაოდენობა: ${tryInputPassword}`);
    let userInputPassword = prompt(`შეიყვანეთ ოთხნიშნა პინ კოდი.\nდარჩენილი ცდილობების რაოდენობა: ${tryInputPassword}`);
    if (userInputPassword === null) {
      console.log('ოპერაცია გაუქმებულია');
      alert('ოპერაცია გაუქმებულია');
      login();
      return;
    }
    if (userInputPassword === '') {
      tryInputPassword--;
      console.log('გთხოვთ შეიყვანეთ პაროლი და უჯრა ცარიელად არ დატოვთ');
      alert('გთხოვთ შეიყვანეთ პაროლი და უჯრა ცარიელად არ დატოვეთ');
    } else if (!/^\d+$/.test(userInputPassword)) {
      tryInputPassword--;
      alert('შემოყვანილი პინ კოდი უნდა შეიცავდეს მხოლოდ ციფრებს.');
    } 
    else {
      if (parseInt(userInputPassword) !== usersInfo[userIndex][3]) {
        tryInputPassword--;
        console.log(`პინ კოდი არასწორია. დარჩენილი ცდილობების რაოდენობა: ${tryInputPassword}`);
        alert(`პინ კოდი არასწორია. დარჩენილი ცდილობების რაოდენობა: ${tryInputPassword}`);
        return;
      } else {
        console.log('პინ კოდი სწორია.');
        menu(userIndex);
        return;
      }
    }
     if (tryInputPassword === 0) {
      console.log(`ანგარიში დაბლოკილია უსაფრთხოების მიზნით\nდარჩენილი ცდილობების რაოდენობა: ${tryInputPassword}`);
      alert(`ანგარიში დაბლოკილია უსაფრთხოების მიზნით\nდარჩენილი ცდილობების რაოდენობა: ${tryInputPassword}`);
      login();
      return;
    }
  }
}

// მომხმარებლის მთავარი მენიუ
function menu(userIndex) {
  while (true) {
    console.log('შეიყვანეთ საჭირო ოპერაციის შესაბამისი რიცხვი:\n1. ბალანსის შემოწმება\n2. თანხის განაღდება\n3. თანხის შეტანა\n4. გამოსვლა')
    let choice = prompt('შეიყვანეთ საჭირო ოპერაციის შესაბამისი რიცხვი:\n1. ბალანსის შემოწმება\n2. თანხის განაღდება\n3. თანხის შეტანა\n4. გამოსვლა');
    switch (choice) {
      case '1':
        checkBalance(userIndex);
        menu(userIndex);
        break;
      case '2':
        withdrawMoney(userIndex);
        menu(userIndex);
        break;
      case '3':
        depositMoney(userIndex);
        menu(userIndex);
        break;
      case '4':
        console.log(`${usersInfo[userIndex][0]} თქვენ გახვედით თქენი გვერდიდან`);
        alert(`${usersInfo[userIndex][0]} თქვენ გახვედით თქენი გვერდიდან`);
        checkUserName();
        return;
        case '':
        console.log(`${usersInfo[userIndex][0]} გთხოვთ აირჩიეთ ერთერთი ოპერაცია ჩამონათვალიდან`);
        alert(`${usersInfo[userIndex][0]} გთხოვთ აირჩიეთ ერთერთი ოპერაცია ჩამონათვალიდან`);
        menu(userIndex);
        return;
        case null:
        console.log(`${usersInfo[userIndex][0]} გვერდიდან დამოსასვლედლად აირჩიეთ ოპერაცია 4`);
        alert(`${usersInfo[userIndex][0]} გვერდიდან დამოსასვლედლად აირჩიეთ ოპერაცია 4`);
        menu(userIndex);
        return;
      default:
        console.log(`${usersInfo[userIndex][0]} თქვენი არჩეული ოპერაცია არავალიდურია თავიდან სცადეთ`);
        alert(`${usersInfo[userIndex][0]} თქვენი არჩეული ოპერაცია არავალიდურია თავიდან სცადეთ`);
    }
  }
}

// ბალანსის შემოწმების ფუნქცია
function checkBalance(userIndex) {
    let balance = usersInfo[userIndex][2];
    console.log(`${usersInfo[userIndex][0]} ${usersInfo[userIndex][1]} თქვენს ბალანსზე არის: ${balance} ლარი`);
    alert(`${usersInfo[userIndex][0]} ${usersInfo[userIndex][1]} თქვენს ბალანსზე არის: ${balance} ლარი`);
  }

// თანხის განაღდების ფუნქცია
function withdrawMoney(userIndex) {
  let amountInput = prompt('შეიყვანეთ თანხა, რომელიც გგსურთ რომ განაღდოთ');
  if (amountInput === null) {
      console.log("თქვენ გააუქმეთ მონაცემის შეკყავანა, გაიმეორეთ.");
      alert("თქვენ გააუქმეთ მონაცემის შეკყავანა, გაიმეორეთ.");
      menu(userIndex);
      return;
  } else if (amountInput === "") {
      console.log("თქვენ არ შეიყვანეთ თანხა, გაიმეორეთ.");
      alert("თქვენ არ შეიყვანეთ თანხა, გაიმეორეთ.");
      withdrawMoney(userIndex);
      return;
  }
  let amount = parseFloat(amountInput);
  if (isNaN(amount) || amount <= 0) {
      console.log('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
      alert('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
      withdrawMoney(userIndex);
      return;
  }
  if (!/^\d+$/.test(amountInput)) {
      console.log('შემოყვანილი თანხა უნდა შეიცავდეს მხოლოდ ციფრებს.');
      alert('შემოყვანილი თანხა უნდა შეიცავდეს მხოლოდ ციფრებს.');
      withdrawMoney(userIndex);
      return;
  }
  if (amount < 1) {
      console.log('გთხოვთ შეიყვანოთ მინიმუმ 1 ლარი');
      alert('გთხოვთ შეიყვანოთ მინიმუმ 1 ლარი');
      withdrawMoney(userIndex);
      return;
  }
  if (!/^\d+$/.test(amountInput) || amount !== parseFloat(amountInput)) {
      console.log('შემოყვანილი თანხა უნდა შეიცავდეს კორექტული ციფრები, გაიმეორეთ');
      alert('შემოყვანილი თანხა უნდა შეიცავდეს კორექტული ციფრები, გაიმეორეთ');
      withdrawMoney(userIndex);
      return;
  } 
  if (!Number.isInteger(amount) || amount <= 0) {
    console.log('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
    alert('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
    withdrawMoney(userIndex)
    return;
  }
  if (amount > 1000000) {
      console.log('დღიური ლიმიტი არის 1,000,000 ლარი,\n გთხოვთ დანარჩენი თანხა განაღდთ შემდეგ დღეს.');
      alert('დღიური ლიმიტი არის 1,000,000 ლარი,\n გთხოვთ დანარჩენი განაღდთ შემდეგ დღეს.');
      withdrawMoney(userIndex);
      return;
  } else if (amount > usersInfo[userIndex][2]) {
      console.log('ბალანსზე არარის საკმარისი თანხა,\nშეიყვანეთ უფრო პატარა რიცხვი.');
      alert('ბალანსზე არარის საკმარისი თანხა,\nშეიყვანეთ უფრო პატარა რიცხვი.');
      withdrawMoney(userIndex);
      return;
  } else {
      usersInfo[userIndex][2] -= amount;
      console.log(`${usersInfo[userIndex][0]} ${usersInfo[userIndex][1]} თქვენ განაღდეთ ${amount} ლარი\nბალანსზე დარჩა: ${usersInfo[userIndex][2]} ლარი`);
      alert(`${usersInfo[userIndex][0]} ${usersInfo[userIndex][1]} თქვენ განაღდეთ ${amount} ლარი\nბალანსზე დარჩა: ${usersInfo[userIndex][2]} ლარი`);
      menu(userIndex);
      return;
  }
}

  // თანხის შეტანის ფუნქცია
  function depositMoney(userIndex) {
    console.log('შეიყვანეთ რამდენი ლარი გინდათ შეიტანოთ ანგარიშზე');
    let amountInput = prompt('შეიყვანეთ რამდენი ლარი გინდათ შეიტანოთ ანგარიშზე');
  
    if (amountInput === null) {
        console.log("თქვენ გააუქმეთ მონაცემის შეკყავანა, გაიმეორეთ.");
        alert("თქვენ გააუქმეთ მონაცემის შეკყავანა, გაიმეორეთ.");
        menu(userIndex);
        return;
    }
    if (amountInput === "") {
        console.log("თქვენ არ შეიყვანეთ კორექტული თანხა, გაიმეორეთ.");
        alert("თქვენ არ შეიყვანეთ კორექტული თანხა, გაიმეორეთ.");
        depositMoney(userIndex);
        return;
    }

    let amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
        console.log('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
        alert('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
        depositMoney(userIndex);
        return;
    }

    if (!/^\d+$/.test(amountInput)) {
        console.log('შემოყვანილი თანხა უნდა შეიცავდეს მხოლოდ ციფრებს.');
        alert('შემოყვანილი თანხა უნდა შეიცავდეს მხოლოდ ციფრებს.');
        depositMoney(userIndex);
        return;
    }

    if (!isFinite(amount) || amount !== parseFloat(amountInput)) {
        console.logt('შემოყვანილი თანხა უნდა შეიცავდეს კორექტული რიცხვი, გაიმეორეთ');
        alert('შემოყვანილი თანხა უნდა შეიცავდეს კორექტული რიცხვი, გაიმეორეთ');
        depositMoney(userIndex);
        return;
    }
    if (!Number.isInteger(amount) || amount <= 0) {
      console.log('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
      alert('თქვენ შეიყვანეთ არაკორექტული თანხა, გაიმეორეთ');
      depositMoney(userIndex);
      return;
    }
    if (amount > 1000000) {
        alert('დღიური ლიმიტი არის 1,000,000 ლარი,\n გთხოვთ დანარჩენი თანხა განაღდთ შემდეგ დღეს.');
        depositMoney(userIndex);
        return;
    }
    usersInfo[userIndex][2] += amount;
    console.log(`${usersInfo[userIndex][0]} ${usersInfo[userIndex][1]} თქვენ ანგარიშზე შეიტანეთ ${amount} ლარი,\nბალანზე არის ${usersInfo[userIndex][2]} ლარი`);
    alert(`${usersInfo[userIndex][0]} ${usersInfo[userIndex][1]} თქვენ ანგარიშზე შეიტანეთ ${amount} ლარი\nბალანზე არის ${usersInfo[userIndex][2]} ლარი`);
    menu(userIndex);
}

// პროგრამის გაშვება
login();