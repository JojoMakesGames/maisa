import type { NumberWord } from '../../types/NumberWord.ts';

type NumberWordCardProps = {
  numberWord: NumberWord;
};

function NumberWordCard({ numberWord }: NumberWordCardProps) {
  return (
    <div className="card">
      {numberWord.url ?
        (<img title={numberWord.numberWord} src={numberWord.url} alt={numberWord.numberWord} />) :
        <h4>{numberWord.numberWord}</h4>}
    </div>
  );
}

export default NumberWordCard;
