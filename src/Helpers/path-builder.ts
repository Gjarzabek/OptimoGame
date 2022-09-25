export class PathBuilder {

    public static character(name: string, animation: string, idx: number): string {
        return `../assets/Character/${name}/${animation}_${idx}.png`
    }

    public static food(idx: number): string {
        return `../assets/Food/${idx}.png`
    }

}