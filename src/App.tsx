import { useState } from 'react';
import styles from './App.module.css';
import powerdImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'

import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem'

const App = () => {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {
        if (heightField && weightField) {
            setToShow(calculateImc(heightField, weightField))
        } else {
            alert('Preencha todos os campos!')
        }
    }

    const handleReturnButton = () => {
        setToShow(null);
        setHeightField(0);
        setWeightField(0);
    }

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={powerdImage} alt="" width={150} />
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule seu IMC.</h1>
                    <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>
                    <div>
                        <input
                            type="number"
                            placeholder='Digite sua altura. Ex: 1.5 (em metros)'
                            value={heightField > 0 ? heightField : ''}
                            onChange={e => setHeightField(parseFloat(e.target.value))}
                            disabled={toShow ? true : false}
                        />
                        <input
                            type="number"
                            placeholder='Digite seu peso. Ex: 85.4 (em kg)'
                            value={weightField > 0 ? weightField : ''}
                            onChange={e => setWeightField(parseFloat(e.target.value))}
                            disabled={toShow ? true : false}
                        />

                        <button
                            onClick={handleCalculateButton}
                            disabled={toShow ? true : false}
                        >
                            Calcular
                        </button>
                    </div>
                </div>
                <div className={styles.rigthSide}>
                    {!toShow &&
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} />
                            ))}
                        </div>
                    }
                    {toShow &&
                        <div className={styles.rigthResult}>
                            <div className={styles.rigthArrow} onClick={handleReturnButton}>
                                <img src={leftArrowImage} alt="" width={25} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}

export default App;