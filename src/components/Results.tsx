import { Button } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { useQuestionsData } from "../hooks/useQuestionsData"

export const Results = () => {
  const reset = useQuestionsStore(state => state.reset)
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <section style={{ marginTop: '16px' }}>
      <strong>
        {`✅ ${correct} corrects' - ❌ ${incorrect} incorrects - ❔ ${unanswered} unanswered`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button variant="outlined" onClick={() => reset()}>reset</Button>
      </div>
    </section>
  )
}