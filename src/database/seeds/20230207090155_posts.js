/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    { header: 'Kono Giorno Giovana', text: 'MudaMudaMuda говорит наш маленький Джованно.', user: 1 },
    { header: 'Random header', text: 'Random text', user: 1 },
    { header: 'Another random header', text: 'Another random text', user: 1 },
    { header: 'И тут опана, резко на русском', text: 'Да, да, все еще на русском', user: 1 },
    { header: 'Some fucking dogshit', text: 'Road roller da', user: 2 },
    { header: 'Penguin says hello', text: '*< Hello', user: 2 },
    { header: 'Dog says goodbye', text: '^[*.*]^ Goodbye', user: 2 },
    { header: 'Я ног не чувствую', text: 'А я ему такой У тебя их нет!', user: 2 },
    { header: 'Ни мамы, ни папы', text: 'Бедный Питер Паркер', user: 2 },
    { header: 'Ах ты ж наш гоблин младший', text: 'Ну давай, заплачь', user: 2 },
    { header: 'Конфетка', text: 'Нету ручек, нет конфетки', user: 3 },
    { header: 'Внимание анектод', text: 'Значит, поцеловались, конкретно, в Зоне две тачилы. Из одной сталкеры вывалили, из другой… Короче, пошли тут терки, разборки, махалово конкретное.А контролер на нычке сидит и лыбу давит: — Оооо, зашибись. Ща поляна накроется — не стыдно и братанов, чисто, на хату позвать.', user: 3 },
    { header: 'Точно не РикРолл', text: 'https://www.youtube.com/watch?v=XfELJU1mRMg&ab_channel=Supirorguy508', user: 3 },
    { header: 'У меня мемы закончились уже', text: 'Даб даб даб', user: 3 },
    { header: '', text: 'Тупа текст', user: 3 },
  ]);
};
